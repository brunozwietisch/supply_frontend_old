const fs = require('fs')

// Leitura do arquivo .htaccess.template
fs.readFile('.htaccess.template', 'utf8', (err, templateContent) => {
  if (err) {
    console.error('Erro ao ler o arquivo .htaccess.template:', err)
    return
  }

  // Gravação do arquivo .htaccess final
  fs.writeFile('build/.htaccess', templateContent, err => {
    if (err) {
      console.error('Erro ao gravar o arquivo .htaccess:', err)
      return
    }
    console.log('Arquivo .htaccess gerado com sucesso!')
  })
})
