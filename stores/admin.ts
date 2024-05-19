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
        },
        async  getLocations(){
            var config = {
                method: 'post',
                url: '/admin/all_locations',
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
        },
        async  getProperties(){
            var config = {
                method: 'post',
                url: '/admin/all_properties',
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
        },
        async  getPropertyTypes(){
            var config = {
                method: 'post',
                url: '/admin/all_property_types',
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
        },
        async  addLocations(data:any){
            var config = {
                method: 'post',
                url: '/admin/add_location',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: data
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
        },
        async  addPropertyTypes(data:any){
            var config = {
                method: 'post',
                url: '/admin/add_property_types',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: data
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
        },
        async  addProperty(data:any){
            var config = {
                method: 'post',
                url: '/admin/add_property',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: data
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