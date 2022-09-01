const { promisify } = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')

const { clone } = require('./clone')

const open = require('open')

const spawnImpl = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise((resolve) => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async function (name) {
  clear()
  const data = await figlet(chalk.gray('welcome'))
  console.log(data)

  console.log('创建项目' + name)
  clone('github:su37josephxia/vue-template', name)

  // 安装依赖
  // windows shell: true
  console.log('安装依赖....')
  await spawnImpl('npm', ['install'], { cwd: `./${name}`, shell: true })

  console.log(
    chalk.green(`
    \(^o^)/~安装完成：
    ======================
      cd ${name}
      npm run serve
    ======================
  `)
  )

  open('http://localhost:8080')
  await spawnImpl('npm', ['run', 'serve'], { cwd: `./${name}`, shell: true })
}
