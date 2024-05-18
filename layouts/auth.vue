<template>
    <main>
      <Head>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=0.8, shrink-to-fit=no" />
          <Title>Lucile Login</Title>
          <link href="/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
            <link
                href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet">

            <!-- Custom styles for this template-->
            <link href="/assets/sb-admin-2.min.css" rel="stylesheet">
      </Head>

      <div class="container-scroller">
          <div class="container-fluid page-body-wrapper">
              <div class="main-panel">
                  <div class="content-wrapper">
                      <div class="row">
                          <div class="col-sm-12">
                          <div class="home-tab">
                              <slot />
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </main>
</template>

<script lang="ts">
  export default defineNuxtComponent({
    head() {
      return {
        script: [
          {
            src: "/vendor/jquery/jquery.min.js"
          },
          {
            src: "/vendor/bootstrap/js/bootstrap.bundle.min.js"
          },
          {
            src: "/vendor/jquery-easing/jquery.easing.min.js"
          },
          {
            src: "/js/sb-admin-2.min.js"
          }
        ] 
      }
    },
  });
</script>

<style>
  .w-100p {
      width: 100%;
  }

  body::-webkit-scrollbar {
    background-color: transparent;
    height: 5px;
    width: 10px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: rgba(32,33,36,0.38);
    border: none;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
</style>