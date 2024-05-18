export default defineNuxtRouteMiddleware (async (to, from) => {
    const token = useCookie('token').value || "";
    
    try {
      const { data, success }: any = await $fetch('/auth/verify-token', {
        method: "POST",
        body: JSON.stringify({
          token
        })
      })
    
      if(success && data?.is_valid === true) return navigateTo('/admin/dashboard')
    } catch (error) {
      console.error(error)
    }
  })