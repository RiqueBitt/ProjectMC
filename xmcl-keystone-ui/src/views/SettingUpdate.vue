<template>
  <SettingCard
    v-if="!disableUpdate"
    :title="t('setting.update')"
    icon="rocket_launch"
  >
    <SettingItem data-testid="settings-update-note">
      <template #preaction>
        <v-icon color="primary">
          apps
        </v-icon>
      </template>

      <template #title>
        v{{ version }}
      </template>

      <template #subtitle>
        {{ PROJECT_CLUB_UPDATE_NOTE }}
      </template>
    </SettingItem>
  </SettingCard>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { injection } from '@/util/inject'
import { kUpdateSettings } from '../composables/setting'
import SettingCard from '@/components/SettingCard.vue'
import SettingItem from '@/components/SettingItem.vue'

// Project Club: o ProjectMC não procura/baixa/instala atualizações por conta
// própria — ele é atualizado pela aba Apps do Project Club. Por isso os botões
// "procurar atualização" e "atualizar/instalar" deram lugar a um aviso curto,
// mantendo só a versão instalada à mostra.
// Mesmo texto usado no menu da bandeja (xmcl-electron-app/main/utils/updater.ts).
const PROJECT_CLUB_UPDATE_NOTE = 'O ProjectMC é atualizado pela aba Apps do Project Club.'

const disableUpdate = false // state.env !== 'raw'
const { version } = injection(kUpdateSettings)
const { t } = useI18n()

</script>

<style scoped>
:deep(.transparent-list) {
  background: transparent !important;
}

.v-card {
  transition: all 0.2s ease;
}

.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
