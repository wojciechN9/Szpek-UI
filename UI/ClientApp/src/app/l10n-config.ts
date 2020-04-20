import { L10nConfig, L10nLoader } from "angular-l10n";
import { enTextResources } from "./text-resources/en-text-resources";
import { plTextResources } from "./text-resources/pl-text-resources";

function getTextResources() {
  return {
    'en-US': enTextResources,
    'pl-PL': plTextResources
  }
}

export const l10nConfig: L10nConfig = {
  format: 'language-region',
  providers: [
    { name: 'app', asset: getTextResources() }
  ],
  cache: true,
  keySeparator: '.',
  defaultLocale: { language: 'en-US', currency: 'USD' },
  schema: [
    { locale: { language: 'en-US', currency: 'USD' }, dir: 'ltr', text: 'United States' },
    { locale: { language: 'pl-PL', currency: 'PLN' }, dir: 'ltr', text: 'Poland' }
  ]
};

export function initL10n(l10nLoader: L10nLoader): () => Promise<void> {
  return () => l10nLoader.init();
}
