import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getFirestore,collection, doc, getDocs, addDoc, updateDoc, deleteField, deleteDoc, getDoc, onSnapshot, setDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.8.0/firebase-storage.min.js";

  
export class collection_{
    constructor(db,name){
        this.name = name;
        this.db = db;
        this.collection = collection(db, name)
    }

    //await fs.collection("name").add(value)  value:{}
    async add(value = {},id = ""){
        if (id!="")
        {
            const docRef = doc(this.db, this.name, id);
            await setDoc(docRef, value);
        }
        else{
            const docRef = await addDoc(this.collection, value);
            return docRef.id
        }
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

    subscribe(f = ()=>{},id = "",includeMetadataChanges=true){
        try{
            if (id!="")
            onSnapshot(
                doc(this.db, this.name, id), 
                { includeMetadataChanges: includeMetadataChanges }, 
                (doc) => {
                f(doc.data(),doc.id);
                });
            else onSnapshot(
                collection(this.db, this.name), 
                { includeMetadataChanges: true }, 
                (querySnapshot) => {
                    const data = [];
                    querySnapshot.forEach((doc) => {
                        data.push({id:doc.id,values:doc.data()});
                    });
                    f(data);
                });
        }catch(e){
            console.log(e);
        }
    }


}

export class storage_{
    constructor(){

    }
    getStorageRef(path){
        return ref(this.storage,path)
    }

    uploadBytesResumable(path,file, f1 = ()=>{}, f2 = ()=>{}){
        const ref = this.getStorageRef(path);
        const uploadTask =  uploadBytesResumable(ref,file);
        uploadTask.on('state_changed',
        (snapshot)=> {
            f1(snapshot);
        },
        (error)=> {
            console.log("error");
        },
        f2(uploadTask.snapshot.ref)
        )
    }
}


export class Firestore{
    constructor(firebaseConfig){
        this.firebaseConfig = firebaseConfig;
        this.db = this.setEnvironmentDB(firebaseConfig)
        this.storage = null;
        //this.collection = collection(this.db,"name")
    }
    setEnvironmentDB(firebaseConfig){
        
          // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        return getFirestore(app);
    }
    setStorage(){
        const app = initializeApp(this.firebaseConfig);
        this.storage = getStorage(app)
    }

    collection(name){
        return new collection_(this.db,name)
    }

    storage(){
        if (this.storage!=null)
        return new storage_(this.storage)
    }
    



    
}





// const fs= new Firestore()

// console.log(await fs.collection("caro"));

// console.log(fs.collection("caro").collection.snapshotChanges());

// fs.collection("caro").subscribe((turn)=>{
//     console.log(turn);
// },"0OibwQEdLT8EeB4Fll26")



