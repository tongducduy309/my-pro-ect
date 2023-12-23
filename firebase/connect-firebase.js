import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getFirestore,collection, doc, getDocs, addDoc, updateDoc, deleteField, deleteDoc, getDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'


  
class collection_{
    constructor(db,name){
        this.name = name;
        this.db = db;
        this.collection = collection(db, name)
    }

    //await fs.collection("name").add(value)  value:{}
    async add(value = {}){
        const doc = await addDoc(this.collection, value);
        return doc.id
    }

    //await fs.collection("name").get()
    async getCollection (){
        let array = [],json = {}
        const querySnapshot = await getDocs(this.collection);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            
            array.push({_id:doc.id,...doc.data()});
            json["_"+doc.id] = {_id:doc.id,...doc.data()};
        });
        return { array: array, json: json }

    }

    async get(id){
        try
        {
            const docSnap = await getDoc(doc(this.db, this.name, id));
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null;
            }
        }
        catch(e) {
            console.log(e);
            return null;
        }
        

    }

    async update(id,value){
        const docRef = doc(this.db, this.name, id);
        await updateDoc(docRef, value);
    }

    async delete(id,fieldNames=[]){
        const docRef = doc(this.db, this.name, id);
        const value = {}
        for (let f of fieldNames)
            value[f]= deleteField()
        await updateDoc(docRef, value);
    }

    async deleteDoc(id){
        await deleteDoc(doc(this.db, this.name, id));
    }
}


class Firestore{
    constructor(){
        this.db = this.setEnvironmentDB()
        //this.collection = collection(this.db,"name")
    }
    setEnvironmentDB(){
        const firebaseConfig = {
            apiKey: "AIzaSyAXtmyMCcSb2lig6GqhFaM_0oKHHa09HWI",
            authDomain: "newapp-a6378.firebaseapp.com",
            projectId: "newapp-a6378",
            storageBucket: "newapp-a6378.appspot.com",
            messagingSenderId: "440187362295",
            appId: "1:440187362295:web:effbea8486bad7f95a6cf2",
            measurementId: "G-CCDEXW4RG9"
          };
        
          // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        return getFirestore(app);
    }

    collection(name){
        return new collection_(this.db,name)
    }



    
}