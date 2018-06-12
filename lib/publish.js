const execa = require('execa')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  logger.log(`Pushing version ${pluginConfig.name}:${version} to docker hub`)

  if (!pluginConfig.skipLatest) {
    execa('docker', ['tag', `${pluginConfig.name}:latest`], { stdio: 'inherit' })
    execa('docker', ['push', `${pluginConfig.name}:latest`], { stdio: 'inherit' })
  }

  execa('docker', ['tag', `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
  execa('docker', ['push', `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
}
