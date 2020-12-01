<template>
    <div class="jumbotron">
        <h1 class="title">AHHHHHHHHHHHHH Me encontraste!</h1>
        <h3 class="subtitle" >
            Pero también encontraste un error <b>404</b>, lo que significa que la página que estabas buscando no existe!
            <br/>
                Presiona <router-link :to="{ name: 'inicio' }"><b>aquí</b></router-link> para volver al inicio
        </h3>

        <hr>

        <img src="../assets/404-monster.jpg" alt="404Moster">

    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

</style>