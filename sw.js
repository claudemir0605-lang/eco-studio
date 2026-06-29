/* Service worker do Controle de Gastos.
   Estratégia: network-first para a navegação (sempre pega a versão mais nova
   quando há internet) e cache como reserva para funcionar offline. */
const CACHE = "gastos-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", e=>{
  const req = e.request;
  if(req.method!=="GET") return;
  const url = new URL(req.url);

  // Não interceptar chamadas do Firebase (precisa ir sempre à rede)
  if(/firestore\.googleapis\.com|firebaseio\.com|identitytoolkit\.googleapis\.com|googleapis\.com/.test(url.host)){
    return;
  }

  // Navegação (abrir o app): rede primeiro, cache como reserva
  if(req.mode==="navigate"){
    e.respondWith(
      fetch(req).then(res=>{
        const copy=res.clone(); caches.open(CACHE).then(c=>c.put("./index.html",copy)); return res;
      }).catch(()=>caches.match("./index.html"))
    );
    return;
  }

  // Demais arquivos (ícones, manifest): cache primeiro, atualiza em segundo plano
  e.respondWith(
    caches.match(req).then(cached=>{
      const rede = fetch(req).then(res=>{
        if(res && res.status===200 && res.type==="basic"){
          const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req,copy));
        }
        return res;
      }).catch(()=>cached);
      return cached || rede;
    })
  );
});
