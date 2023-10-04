import { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";


const  useCreateDocument = () => {

    const db = getFirestore();

    const [data, setData] = useState({
        orderId: null,
        loading: true,
        error: null
    })

    const createOrder = async (order) =>  {
    
        try {
            setData({
                ...data,
                loading: true
            })
            const userRef = collection(db, 'orders');
            const docRef = await addDoc(userRef, order);
            setData({
                    ...data,
                    loading: false,
                    orderId: docRef
            }); 
        } catch {
                console.log(error);
                setData({
                    ...data,
                    error
                })
        }
    }

    const createProduct = async () => {
        
        const products = [
            {
                title: "Apple iPhone 12",
                stock:10,
                price: 799,
                category: "smartphones",
                description: "New Apple iPhone 12 (64GB, Blue) [Locked] + Carrier Subscription",
                thumbnail: "https://images-na.ssl-images-amazon.com/images/I/71ZOtNdaZCL._AC_SL1500_.jpg",
            },
            {
                title: "Apple iPhone 11",
                stock:10,
                price: 599,
                category: "smartphones",
                description: "Apple iPhone 11, 64GB, Black - Fully Unlocked (Renewed)",
                thumbnail: "https://images-na.ssl-images-amazon.com/images/I/51kGDXeFZKL._AC_SL1024_.jpg",
            },
            {
                title: "Apple iPhone SE",
                stock:10,
                price: 399,
                category: "smartphones",
                description: "Apple iPhone SE, 64GB, Black - Fully Unlocked (Renewed Premium)",
                thumbnail: "https://images-na.ssl-images-amazon.com/images/I/71YlH-4MUQL._AC_SL1500_.jpg",
            },
        ]

        try {

            for(const product of products) {
                await addDoc(collection(db, "products"), product)
            }
            
            console.log('Datos agregados correctamente');
        } catch (error) {
            
            console.log('Error al agregar datos a Firestore', error);
        }
    }
  return { createOrder, ...data, createProduct }
}

export default useCreateDocument;