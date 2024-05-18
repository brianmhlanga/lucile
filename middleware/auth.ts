export default defineNuxtRouteMiddleware (async (to, from) => {
    const user: any = useCookie('user').value || "";
    const token = useCookie('token').value || ""
    
    if(user) {
      try {
        const { data, success }: any = await $fetch('/auth/verify-token', {
          method: "POST",
          body: JSON.stringify({
            user_id: user?.id,
            token
          })
        })
      
        if(!success || data?.is_valid === false) return navigateTo('/login')
      } catch (error) {
        console.error(error)
      }
    } else {
      if(!user || !token) return navigateTo('/login')
    }
  })
  
  