import { ElectronUpdateOperation, ReleaseInfo } from '@xmcl/runtime-api'
import { DownloadUpdateOptions, LauncherAppUpdater } from '@xmcl/runtime/app'
import { Logger } from '~/infra'
import ElectronLauncherApp from '../ElectronLauncherApp'

/**
 * Project Club: o ProjectMC NÃO se atualiza sozinho.
 *
 * As atualizações do launcher são distribuídas exclusivamente pela aba
 * "Apps" do Project Club, então este updater nunca acessa a rede: não
 * consulta o electron-updater (releases do RiqueBitt/ProjectMC), nem os
 * endpoints do XMCL original (releases do Voxelum no GitHub, o espelho
 * registry.npmmirror.com/@xmcl/app-*, o .appinstaller em
 * xmcl.blob.core.windows.net ou a API api.xmcl.app).
 *
 * A verificação sempre responde "sem atualização" e baixar/instalar não
 * fazem nada. A implementação antiga (auto-updater + atualização por .asar)
 * continua no histórico do git caso um dia seja preciso reativar.
 */
export const PROJECT_CLUB_UPDATE_NOTE = 'O ProjectMC é atualizado pela aba Apps do Project Club.'

export class ElectronUpdater implements LauncherAppUpdater {
  private logger: Logger

  constructor(private app: ElectronLauncherApp) {
    this.logger = app.getLogger('ElectronUpdater')
  }

  async checkUpdateTask(): Promise<ReleaseInfo> {
    // Sem rede: devolve a própria versão instalada marcada como "sem novidade".
    this.logger.log(`Self-update disabled: ${PROJECT_CLUB_UPDATE_NOTE}`)
    return {
      name: this.app.version,
      body: '',
      date: '',
      files: [],
      newUpdate: false,
      operation: ElectronUpdateOperation.Manual,
    }
  }

  async downloadUpdate(_updateInfo: ReleaseInfo, _options?: DownloadUpdateOptions): Promise<void> {
    // Nunca baixa nada — a atualização vem pelo Project Club.
    this.logger.warn(`Ignoring download update request. ${PROJECT_CLUB_UPDATE_NOTE}`)
  }

  async installUpdateAndQuit(_updateInfo: ReleaseInfo): Promise<void> {
    // Nunca instala nada — a atualização vem pelo Project Club.
    this.logger.warn(`Ignoring install update request. ${PROJECT_CLUB_UPDATE_NOTE}`)
  }
}
