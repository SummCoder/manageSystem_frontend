<template>
  <div class="home">
    <div class="background-image">
      <div class="content">
        <div class="text-container">
          <h1>SummCoder</h1>
          <h2>记录第一次SpringBoot + Vue项目实践</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.home {
  height: 100%;
  display: flex;
  align-items: center;
}

.background-image {
  background-image: url('https://s2.loli.net/2023/03/10/YNV2HmZqTptc79o.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.text-container {
  text-align: center;
  color: #ffffff;
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

h2 {
  font-size: 24px;
}
</style>