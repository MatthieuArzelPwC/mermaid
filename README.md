# Mermaid Diagram pour WeWeb

Element WeWeb qui transforme une chaine Mermaid en diagramme SVG. La propriete `code` est bindable et peut donc venir d'une variable WeWeb, d'une collection ou de Supabase.

## Developpement local

Prerequis : Node.js 18 ou plus recent.

```bash
npm install
npm run serve
```

Pour verifier le bundle de production :

```bash
npm run build
```

Le serveur utilise HTTPS sur le port `8080` par defaut. Ouvrir `https://localhost:8080` une premiere fois et accepter le certificat local.

Dans WeWeb :

1. Ouvrir le projet, puis `Dev` > `Open Dev Editor`.
2. Dans le Dev Editor, ouvrir `Dev` > `Element` > `Add local Element`.
3. Choisir le port `8080`.
4. Glisser `Diagramme Mermaid` depuis le panneau Dev sur la page.
5. Renseigner `Code Mermaid` dans les settings du composant ou le binder a une donnee.

La propriete accepte directement le contenu Mermaid :

```text
flowchart
    A[Demande] --> B{Budget > 500k EUR ?}
    B -->|Oui| C[Comite Investissement]
    B -->|Non| D[Validation standard]
```

Les delimitateurs Markdown d'un bloc Mermaid sont facultatifs. Le composant les retire s'ils sont presents.

## Publication dans WeWeb

1. Creer un depot GitHub dedie a ce dossier et y pousser son contenu.
2. Dans le dashboard WeWeb, ajouter une nouvelle `Source code` pointant vers ce depot.
3. Ouvrir l'editeur WeWeb normal.
4. Dans `Dev`, retrouver la source puis glisser le composant sur la page.
5. Pour publier une mise a jour, incrementer `version` dans `package.json`, pousser le commit, puis selectionner cette version dans le dashboard WeWeb.

## Utilisation avec Supabase

Stocker uniquement la definition Mermaid dans une colonne texte, par exemple `mermaid_code`. Dans les settings de l'element, cliquer sur l'icone de binding de `Code Mermaid`, puis choisir :

```text
collection-item.mermaid_code
```

Le diagramme est regenere automatiquement quand la valeur bindee change.

L'option bindable `Gauche vers droite` controle l'orientation des flowcharts : activee pour `LR`, desactivee pour `TB`. Elle remplace toute direction eventuellement presente apres `flowchart` ou `graph` dans le code source.

## Securite et limites

- Mermaid fonctionne avec `securityLevel: strict` afin de neutraliser le HTML et les interactions non fiables dans les donnees.
- Un diagramme large reste consultable avec un defilement horizontal.
- Le composant affiche l'erreur de syntaxe sans casser la page.
- Mermaid sert a afficher un graphe. Pour deplacer les noeuds ou modifier les liens a la souris, il faut plutot un composant base sur Vue Flow.
