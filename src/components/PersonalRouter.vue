<template>
  <router-link :to="route">{{ buttonText }}</router-link>
</template>

<script setup>
defineProps({
  route: String,
  buttonText: String,
});
</script>

<style></style>

<!-- 
router -> define las rutas.

<router-link> -> me dirige al componente 
con variables hace falta bindear la key :to como en el ejemplo de arriba, en el caso de algo que no se mueva no con un to="/asdasd" no haria falta.

(es el <a> de view y el to="" el href="")
  BOTON QUE LO ACTIVA

 - Carga y renderiza el componente asocidado para mostrarlo por una salida de router view por defecto o por la salida de su mismo nombre. -


<router-view> -> me enseña el componente
DONDE LO QUIERO VER
  Te carga una vista ( es como poner un componente) pero en este caso va ligado a la ruta, ej; cuando vaya con un router-link "login" a login cargame login.
  En resumen router-view recarga ese "componente" haciendo que todo lo demas , ej; navbar y footer no se recargaran.

 -->
