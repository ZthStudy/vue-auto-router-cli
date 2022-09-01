const fs = require('fs')
const handlebars = require('handlebars')

module.exports = async function () {
  const viewList = fs
    .readdirSync('./src/views')
    .filter((dir) => dir !== 'Home.vue')
    .map((dir) => ({
      name: dir.replace('.vue', '').toLowerCase(),
      file: dir,
    }))

  compile({ list: viewList }, './src/App.vue', './template/App.vue.hbs')
  compile({ list: viewList }, './src/router.js', './template/router.js.hbs')

  function compile(meta, writeFilePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const templateContent = fs.readFileSync(templatePath).toString()

      const templData = handlebars.compile(templateContent)(meta)

      fs.writeFileSync(writeFilePath, templData)

      console.log('刷新路由完毕')
    }
  }
}
