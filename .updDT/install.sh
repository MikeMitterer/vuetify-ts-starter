#!/usr/bin/env bash
#' ------------------------------------------------------------------------------
#" Das Script stellt von VUE auf VITE um.
#' ------------------------------------------------------------------------------

# DEV_LOCAL muss in .bashrc gesetzt werden. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if [ -z ${DEV_BASH+x} ]; then echo "Var 'DEV_BASH' nicht gesetzt!"; exit 1; fi
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Abbruch bei Problemen (https://goo.gl/hEEJCj)
#
# Wenn ein Fehler nicht automatisch zu einem exit führen soll dann
# kann 'command || true' verwendet werden
#
# Für die $1, $2 Abfragen kann 'CMDLINE=${1:-}' verwendet werden
#
# -e Any subsequent(*) commands which fail will cause the shell script to exit immediately
# -o pipefail sets the exit code of a pipeline to that of the rightmost command
# -u treat unset variables as an error and exit
# -x print each command before executing it
# set -eou pipefail

#------------------------------------------------------------------------------
# Einbinden der globalen Libs
#   Hier sind z.B. Farben, generell globale VARs und Funktionen definiert
#

if [[ "${__TOOLS_LIB__:=""}" == "" ]]; then . "${DEV_BASH}/tools.lib.sh"; fi
if [[ "${__APPS_LIB__:=""}" == "" ]]; then . "${DEV_BASH}/apps.lib.sh"; fi

#------------------------------------------------------------------------------
# BASIS
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT=$(realpath "$0")
readonly SCRIPT_PATH=$(dirname "${SCRIPT}")

readonly SCRIPT_DOC=$(scriptToDoc "${SCRIPT}")

readonly MD5_FILE="${SCRIPT_PATH}/.${SCRIPT_NAME}.md5"

readonly MD5=$(md5 -q "${SCRIPT}")
readonly PREV_MD5=$(cat "${MD5_FILE}" 2>>/dev/null)

readonly HAS_CHANGED=$([[ "${MD5}" != "${PREV_MD5}" ]] && echo "true" || echo "false")
echo "${MD5}" > "${MD5_FILE}"

# echo "MD5: '${MD5}'"
# echo "PREV_MD5: '${PREV_MD5}'"
# echo "HAS_CHANGED: '${HAS_CHANGED}'"

if [[ -f "package.json" ]]; then
  readonly PACKAGE_NAME=$(jq -r -j '.name' package.json)
else
  readonly PACKAGE_NAME=""
fi

readonly TEMPLATE_FOLDER="${DEV_LOCAL}/Templates/Production/TypeScript"

readonly PACKAGE_FOLDER="package"
readonly SCRIPT_SECTION="scripts-wp_env.json"
readonly SCRIPT_SECTION_FILE="${TEMPLATE_FOLDER}/${PACKAGE_FOLDER}/${SCRIPT_SECTION}"

readonly DEFAULT_JENKINS_BUILD="build.jenkins"
readonly DEFAULT_JENKINS_BUILD_FILE="${TEMPLATE_FOLDER}/${DEFAULT_JENKINS_BUILD}"

# CMDLINE kann ab hier verwendet werden ---------------------------------------
readonly CMDLINE=${1:-}
readonly OPTION=${2:-""}

#------------------------------------------------------------------------------
# Functions
#
isPackageInstalled() {
  local _PACKAGE_NAME="$1"

  local _DEPENDENCIES=$(jq -r -j ".dependencies.${_PACKAGE_NAME}" package.json 2>>/dev/null)
  local _DEV_DEPENDENCIES=$(jq -r -j ".devDependencies.${_PACKAGE_NAME}" package.json 2>>/dev/null)

#  echo "_DEPENDENCIES: '${_DEPENDENCIES}'"
#  echo "_DEV_DEPENDENCIES: '${_DEV_DEPENDENCIES}'"

  if [[ ("${_DEPENDENCIES}" == "" && "${_DEV_DEPENDENCIES}" == "") || (${_DEPENDENCIES} == "null" && "${_DEV_DEPENDENCIES}" == "null") ]]; then
    echo "false"
  else
    echo "true"
  fi
}

readonly IS_DATE_FNS_INSTALLED=$(isPackageInstalled "vue")

removePackages() {
  yarn remove @babel/plugin-proposal-class-properties
  yarn remove @babel/plugin-proposal-nullish-coalescing-operator
  yarn remove @babel/plugin-proposal-object-rest-spread
  yarn remove @babel/plugin-proposal-optional-chaining
  yarn remove @tailwindcss/postcss7-compat
  yarn remove @types/eslint
  yarn remove @vue/cli-plugin-babel
  yarn remove @vue/cli-plugin-typescript
  yarn remove @vue/cli-plugin-unit-jest
  yarn remove @vue/cli-service
  yarn remove vue-cli-plugin-vuetify
  yarn remove babel-core
  yarn remove babel-loader
  yarn remove postcss-loader
  yarn remove sass-loader
  yarn remove tslint-consistent-codestyle
  yarn remove vue-jest
  yarn remove webpack
  yarn remove workbox-webpack-plugin
  yarn remove vuetify-loader
  yarn remove yorkie

  if [[ "${PACKAGE_NAME}" != "@mmit/styles" ]];then
    yarn remove postcss
    yarn remove postcss-cli
    yarn remove autoprefixer
  fi
}


addPackages() {
    yarn add -D \
      @babel/core@7.22.11 \
      @babel/plugin-transform-runtime@7.22.10 \
      @babel/preset-env@7.22.10 \
      @babel/preset-typescript@7.22.11 \
      @typescript-eslint/eslint-plugin@6.7.4 \
      @typescript-eslint/parser@6.7.4 \
      @vitejs/plugin-vue2@2.2.0 \
      @vue/test-utils@1 \
      @vue/vue2-jest@29.2.4 \
      babel-jest@29.7.0 \
      babel-plugin-transform-inline-environment-variables@^0.4.3 \
      eslint-plugin-vue@8 \
      eslint-plugin-vue@9.17.0 \
      eslint@8 \
      jest-environment-jsdom@29.7.0  \
      jest-environment-node@29.7.0  \
      jest-extended@2.0.0  \
      jest@29.7.0  \
      ts-jest@^29.1.1 \
      tslib@^2.6.2 \
      typescript@5.2.2 \
      vite-plugin-ejs@1.6.4 \
      vite-plugin-node-polyfills@0.15.0 \
      vite-plugin-pwa@0.16.5 \
      vite@4.4.9 \
      vue-template-compiler@2.7 \
      vue-tsc@1.8.15 \
      vuetify2-component-types@2.7

    yarn add vue@^2.7

    [[ "$(isPackageInstalled "date-fns")" == "false" ]] && yarn add -D date-fns@2.23.0
}

changeFiles() {
  if [[ -f "public/index.html" ]]; then
    mv public/index.html .
  fi

  # Vite importiert anders als WebPack
  echo
  sed -i ".bak" -e 's/@import "~/@import "/g' src/assets/styles/main.scss
}

showInfos() {
  echo
  echo "Händisch:"
  echo
  echo "'<script type=\"module\" src=\"src/main.ts\"></script>' bei index.html einfügen..."
  echo
  echo "In packages:"
  echo "    '  \"type\": \"module\",' einfügen"
  echo "    version"
  echo "    clean"
  echo "    test"
  echo "    build"
  echo "updaten"
  echo
  echo "Bei Jenkins:"
  echo "    .jenkins die Variablen updaten"
  echo "    build.jenkins - Die Möglichkeit schaffen, die Tests auszuschalten"
  echo "    build.jenkins - Lint einstweilen ausschalten"
  echo
}

clean() {
  # Script löscht sich selbst
  rm -f ./vue2vite.sh
}

showScriptsSection() {
  subl "${SCRIPT_SECTION_FILE}"
}

showJenkinsBuild() {
  subl "${DEFAULT_JENKINS_BUILD_FILE}"
}

#------------------------------------------------------------------------------
# Options
#

usage() {
    echo
    [[ ${SCRIPT_DOC:-""} != "" ]] && echo -e "${SCRIPT_DOC}"
    echo
    echo "Usage: ${SCRIPT_NAME} [ options ]"
    echo
    usageLine "-h | --help            " "Help"
    usageLine "-i                     " "Show infos"
    echo
    usageLine "-x                     " "Run all commands (remove, add, change)"
    echo
    usageLine "-r                     " "Remove packages"
    usageLine "-a                     " "Add packages"
    usageLine "-c                     " "Change files"
    echo
    usageLine "-ss                    " "Show default Scripts-Section (${YELLOW}${PACKAGE_FOLDER}/${SCRIPT_SECTION}${NC})"
    usageLine "-sj                    " "Show default Jenkins-Build (${YELLOW}${DEFAULT_JENKINS_BUILD}${NC})"
    echo
    usageLine "--clean                " "Clean"
    echo
#    echo -e "${BLUE}Hints:${NC}"
#    echo
}

case "$CMDLINE" in
    -x)
        removePackages
        addPackages
        changeFiles
        showInfos
    ;;

    -r)
        removePackages
    ;;

    -a)
        addPackages
    ;;

    -c)
        changeFiles
    ;;

    -ss)
        showScriptsSection
    ;;

    -sj)
        showJenkinsBuild
    ;;

    -i)
        showInfos
    ;;

    -h|-help|--help|*)
        usage
    ;;

esac

#------------------------------------------------------------------------------
# Alles OK...

exit 0
