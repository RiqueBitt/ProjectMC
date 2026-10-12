import { LauncherAppPlugin } from '~/app'
import { kFlights } from '../flights'

const BUILTIN_FLIGHTS = {
}

/**
 * Project Club: as "flights" (chaves de recurso controladas remotamente pelo
 * XMCL original em api.xmcl.app/flights e xmcl-core-api.azurewebsites.net)
 * não são mais buscadas. O ProjectMC usa só os valores padrão embutidos
 * (BUILTIN_FLIGHTS, vazio) — nenhuma requisição de rede é feita aqui e o
 * cache antigo (flights.json), que vinha desses servidores, é ignorado.
 * Todo código que lê `kFlights` já trata chave ausente como "padrão".
 */
export const pluginFlights: LauncherAppPlugin = async (app) => {
  const logger = app.getLogger('Flights')
  try {
    const filtered = { ...BUILTIN_FLIGHTS } as Record<string, string>
    logger.log('Remote flights disabled (Project Club); using built-in defaults', JSON.stringify(filtered))

    app.protocol.registerHandler('http', async ({ request, response }) => {
      if (request.url.host === 'launcher' && request.url.pathname === '/flights') {
        response.status = 200
        const jsContent = `window.flights = ${JSON.stringify(filtered)}`
        response.headers = {
          'content-type': 'application/javascript',
        }
        response.body = jsContent
      }
    })

    app.registry.register(kFlights, filtered)
  } catch {
    app.registry.register(kFlights, { ...BUILTIN_FLIGHTS })
  }
}
