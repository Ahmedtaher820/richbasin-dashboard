<template>
    <div class="loader-page fixed left-0 center-items top-0 w-full h-full">
        <div class="spinner relative"></div>
    </div>

</template>
<style>
.loader-page{
    background-color: rgba(0, 0, 0, 0.145);
    z-index: 999;
}
.spinner {
   width: 70px;
   height: 70px;
   border-radius: 50%;
   background: radial-gradient(farthest-side,#474bff 94%,#0000) top/9px 9px no-repeat,
          conic-gradient(#0000 30%,#474bff);
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
   animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
   100% {
      transform: rotate(1turn);
   }
}
</style>
