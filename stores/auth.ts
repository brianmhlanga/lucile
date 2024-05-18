import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useAuthStore = defineStore('auth', {
  state: () => ({
      // Login
      email: "",
      password: "",
      isLoadingLogin: false,
      // Register
      name: "",
      surname: "",
      phone: "",
      confirmPassword: "",
      isLoadingRegister: false,
      // One Time Pin
      oneTimePin: "",
      isLoadingSendOTP: false,
      isLoadingVerifyOTP: false,
      openTwoFactorAuth: false,
      token: "",
      recaptchaToken: "",
      option: "",
      // Forgot Password
      newPassword: "",
      confirmNewPassword: "",
      isLoadingForgotPassword: false,
      // Affiliate
      affiliate_code: ""
  }),
  actions: {
    async login(data:any) {
      this.isLoadingLogin = true;

      
      try {
        return await $fetch('/auth/login', { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              data: data
          }) 
        }).then((data)=>{
          this.isLoadingLogin = false;
          return {
            data,
            success: true
          }
        });
      } catch (error) {
        this.isLoadingLogin = false;
        console.error(error);
        return {
          data: {},
          success: false
        }
      }
    },
    async register(data:any) {
      this.isLoadingRegister = true;

      try {
        return await $fetch('/auth/register', { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: data,
           
          }) 
        }).then((data)=>{
          this.isLoadingRegister = false;

          return {
            data,
            success: true
          }
        });
      } catch (error) {
        this.isLoadingRegister = false;
        console.error(error);
        return {
          data: {},
          success: false
        }
      }
    },
    async forgotPassword() {
      this.isLoadingForgotPassword = true;

      try {
        return await $fetch('/auth/forgot-password', { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            newPassword: this.newPassword,
            confirmNewPassword: this.confirmNewPassword,
            recaptcha_token: this.recaptchaToken
          }) 
        }).then((data)=>{
          this.isLoadingForgotPassword = false;
          
          return {
            data,
            success: true
          }
        });
      } catch (error) {
        this.isLoadingForgotPassword = false;
        console.error(error);
        return {
          data: {},
          success: false
        }
      }
    },
    async sendOTP() { 
      this.isLoadingSendOTP = true;

      try {
        return await $fetch('/auth/send-otp', { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              email: this.email,
              token: this.token,
              option: this.option
          }) 
        }).then((data)=>{
          this.isLoadingSendOTP = false;
          return {
            data,
            success: true
          }
        });
      } catch (error) {
        this.isLoadingSendOTP = false;
        console.error(error);
        return {
          data: {},
          success: false
        }
      }
    },
    async verifyOTP() { 
      this.isLoadingVerifyOTP = true;


      try {
        return await $fetch('/auth/verify-otp', { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            surname: this.surname,
            phone: this.phone,
            email: this.email,
            password: this.password,
            newPassword: this.newPassword,
            token: this.token,
            option: this.option,
            one_time_pin: this.oneTimePin.replace(/\D/g, ''),
            affiliate_code: this.affiliate_code,
            recaptcha_token: this.recaptchaToken,
          }) 
        }).then((data)=>{
          this.isLoadingVerifyOTP = false;
          return {
            data,
            success: true
          }
        });
      } catch (error) {
        this.isLoadingVerifyOTP = false;
        console.error(error);
        return {
          data: {},
          success: false
        }
      }
    },
    async logout() {
      Swal.fire({
        icon: 'question',
        title: 'Log Out',
        text: 'Do you want to log out',
        showCancelButton: true
      }).then(async (result)=>{
        if(result.isConfirmed){  
          // Clear session
          await $fetch('/auth/logout', { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }).then((data: any)=>{
            return data;
          }).catch((error)=>{
            console.log(error);
          });

          // Reload App
          reloadNuxtApp();
        }
      });
    }
  }
});

