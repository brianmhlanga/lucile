import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('admin', {
    state: ()=>({
        
        
    }),
    getters: {},
    actions: {
        async  getUsers(){
            var config = {
                method: 'post',
                url: '/admin/all_users',
                headers: { 
                    'Content-Type': 'application/json'
                }
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
                 
                 
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;
        }
    }
   })