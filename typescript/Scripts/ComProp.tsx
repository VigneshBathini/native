import {View,Text,Button} from 'react-native'

interface ProductCardProps{
    title:string;
    price:number;
    rating:number;
    image:string;
    onAddtoCart:()=>void;
}

function ProductCard({title,price,rating,image,onAddtoCart}:ProductCardProps){
    return(
        <View>
            <Text>{title}</Text>
            <Text>{price}</Text>
            <Text>{rating}</Text>
            <Button title='Add to cart' onPress={onAddtoCart} />
        </View>
    )
}
