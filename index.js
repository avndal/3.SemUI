const baseUrl = "http://localhost:5135/api/Licenseplates"

Vue.createApp({
    data() {
        return {
            licensePlates: [],
            idToGetBy: -1,
            singleLicensePlate: null,
            deleteId: 0,
            deleteMessage: "",
            addData: { plate: "", time: "" },
            addMessage: "",
        }
    },
    
      created() {
          this.getAllLicensePlates()
      },
    
    methods: {
        async getAllLicensePlates() {
            try {
                const response = await axios.get(baseUrl)
                this.licensePlates = response.data
                console.log(this.licensePlates)
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async getById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleLicensePlate = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addLicensePlate() {
            try {
                const response = await axios.post(baseUrl, this.addData)
                this.addMessage = response.status + " " + response.statusText
                this.getAllLicensePlates()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteLicensePlate(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                const response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllLicensePlates()
            } catch (ex) {
                alert(ex.message)
            }
        },  
    }
}).mount("#app")