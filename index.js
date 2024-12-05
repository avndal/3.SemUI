const licensePlateUrl = "http://localhost:5135/api/Licenseplates"
const ImageUrl = "http://localhost:5135/api/Images"
const vehicleDataUrl = "http://localhost:5135/api/VehicleData/vehicleData"

Vue.createApp({
    data() {
        return {
            licensePlates: [],
            idToGetBy: 0,
            singleLicensePlate: null,
            deleteId: 0,
            deleteMessage: "",
            addData: { plate: "", time: "" },
            addMessage: "",
            licensePlate: "", // Nummerpladen indtastet af brugeren
            vehicleData: null, // Data om bilen hentet fra API'en
            imageId: null,
            imageSrc: null // Base64 billed-URL
        }
    },
    
      created() {
          this.getAllLicensePlates()
      },
    
    methods: {
        async getAllLicensePlates() {
            try {
                const response = await axios.get(licensePlateUrl)
                this.licensePlates = response.data
                console.log(this.licensePlates)
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async getById(id) {
            const url = licensePlateUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleLicensePlate = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addLicensePlate() {
            try {
                const response = await axios.post(licensePlateUrl, this.addData)
                this.addMessage = response.status + " " + response.statusText
                this.getAllLicensePlates()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteLicensePlate(deleteId) {
            const url = licensePlateUrl + "/" + deleteId
            try {
                const response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllLicensePlates()
            } catch (ex) {
                alert(ex.message)
            }
        },  
           // Hent bilens data fra Nummerplade API'en
           async getVehicleData(licensePlate) {
            const url = vehicleDataUrl + `/` + licensePlate;
        
            try {
                const response = await axios.get(url);
                this.vehicleData = response.data.data;  // Gem dataen i vehicleData
                console.log("Data fra Nummerplade API:", this.vehicleData);
            } catch (error) {
                alert("Fejl ved hentning af køretøjsdata: " + error.message);
            }
        },
        async getImageById(id) {
            try {
                if (!id) {
                    alert("Please provide a valid Image ID.");
                    return;
                }
                const response = await axios.get(`http://localhost:5135/api/Images/image/${id}`);
                this.imageSrc = response.data.imageUrl; // Backend skal returnere en 'imageUrl'
            } catch (error) {
                console.error('Error fetching image:', error);
                this.imageSrc = null;
                alert('Image not found or failed to fetch.');
            }
        },
    }
}).mount("#app")