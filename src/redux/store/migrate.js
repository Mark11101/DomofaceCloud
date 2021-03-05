const versions = [
  {
    version: 10,
    up: (state) => {
      return state
    },
  },
  {
    version: 11,
    up: (state) => {
      return {
        Auth: {
          ...state.Auth,
        },
      }
    },
  },
  {
    version: 12,
    up: (state) => {
      return {
        Auth: {
          ...state.Auth,
        },
      }
    },
  },
  {
    version: 13,
    up: (state) => {
      return {
        Auth: {
          token: state.Auth.token,
        },
      }
    },
  },
]

const migrate = (state, version) => {
  const currentVersionIndex = versions.findIndex((item) => item.version === version)

  if (currentVersionIndex === (versions.length - 1)) {
    return {
      state,
      version,
    }
  }

  let migratedState = {...state}

  versions.forEach((item, itemIndex) => {
    if (itemIndex > currentVersionIndex) {
      migratedState = item.up(state)
    }
  })

  return {
    state: {...migratedState},
    version: versions[versions.length - 1],
  }
}

export const actualVersion = versions.reduce(
  (prevVersion, version) =>
    version.version > prevVersion ? version.version : prevVersion
  , 0,
)

export default migrate
