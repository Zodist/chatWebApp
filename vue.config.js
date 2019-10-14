module.exports = {
  "configureWebpack": {
    "optimization": {
      "minimize": true
    }
  },
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://localhost:4000"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}