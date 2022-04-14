<template>
  <div class="container">
    <h1>Inicio</h1>
    <div class="outer-container">
      <div class="row p-5 shadow m-5" id="container">
        <div class="column" id="content">
          <h2> Prueba Técnica Studiogenesis</h2>
          <h4>Ruben Hierro</h4>
          <div d-flex mt-3>
            <i class="fa-regular fa-envelope"></i> <a href="mailto:rubenhierro@gmail.com">Email</a> -
            <i class="fa-brands fa-linkedin-in"></i> <a href="https://www.linkedin.com/in/rubenhierro/" target="_blank">LinkedIn</a> -
            <i class="fa-brands fa-github"></i> <a href="https://github.com/rubenhierro" target="_blank">Github</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.outer-container {
  display: flex;
  justify-content: center;
}
#container {
  max-width: 600px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  margin: auto;
}
#content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>