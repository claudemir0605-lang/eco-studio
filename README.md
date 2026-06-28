# 💰 Controle de Gastos Pessoal

Planilha pessoal para controle de gasto e consumo mensal, feita para ser
preenchida **diariamente** sempre que você efetuar um gasto.

## Arquivos

- **`Controle_de_Gastos.xlsx`** — a planilha pronta para usar (Excel, Google
  Sheets ou LibreOffice).
- **`gerar_planilha.py`** — script que gera a planilha (rode novamente se quiser
  recriá-la ou mudar o ano de referência).

## Abas da planilha

| Aba | Para que serve |
|-----|----------------|
| **Painel** | Visão geral automática: total do ano, total do mês atual, maior gasto, média e instruções de uso. |
| **Lançamentos** | Onde você registra cada gasto no dia a dia: **Data, Categoria, Descrição, Forma de pagamento, Valor**. |
| **Resumo Mensal** | Soma tudo **automaticamente** por categoria e por mês (Jan–Dez), com total e média. |
| **Categorias** | Lista de categorias e formas de pagamento. Edite aqui para personalizar. |

## Como usar no dia a dia

1. Abra a aba **Lançamentos**.
2. Em cada gasto, preencha uma linha:
   - **Data** → o dia do gasto;
   - **Categoria** → escolha na lista suspensa;
   - **Descrição** → ex.: "almoço", "conta de luz";
   - **Forma de pagamento** → lista suspensa (Pix, Crédito, etc.);
   - **Valor** → quanto gastou.
3. Pronto! O **Resumo Mensal** e o **Painel** se atualizam sozinhos.

## Recriar / personalizar

```bash
pip install openpyxl
python3 gerar_planilha.py
```

Para mudar o ano do resumo, altere a variável `ANO` no início do
`gerar_planilha.py`. Para mudar as categorias, edite a lista `categorias`
(ou simplesmente edite a aba **Categorias** direto na planilha).
