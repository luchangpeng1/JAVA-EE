<template>
  <div class="app-container">
    <h1>JAVAEE复习</h1>
    <nav>
      <router-link to="/choice">选择题</router-link> |
      <router-link to="/short-answer">简答题</router-link> |
      <router-link to="/programming">程序题</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app-container {
  text-align: center;
  padding: 20px;
}

nav {
  padding: 20px 0;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}

nav a.router-link-active {
  color: #42b983;
}
</style>
