pandoc invoice.md -t plain-simple_tables+pipe_tables -o invoice.plaintext.njk
pandoc invoice.md -t html -o invoice.html.njk
