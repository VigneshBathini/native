import { Image, StyleSheet, View, Text, Pressable, Alert, ScrollView } from "react-native"

export default function Images() {

  const cards = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5", "Card 6"];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 50 }}
    >
      <View style={styles.container}>
        <Image
          // source={require("./assets/icon.png")} for local images
          source={{
            uri: "https://picsum.photos/200"
          }}
          style={{ height: 150, width: 150, borderRadius: 150 }}
          resizeMode="cover"
        />

        <Text style={styles.name}> VIZ</Text>

        <Text style={styles.role}> React Native Developer</Text>

        <Pressable onPress={() => Alert.alert("Yeah lets grow", "Buddy")} style={styles.follow}>
          <Text style={{ color: "white" }}>Follow</Text>
        </Pressable>
        <View style={styles.cardsContainer}>

          {
            cards.map((card)=>(
              <View key={card} style={styles.cards}>
                <Text>{card}</Text>
                </View>
            ))
          }
          {/* <View style={styles.cards}>
            <Text>1</Text>
          </View> */}
          {/* <View style={styles.cards}>
            <Text>2</Text>
          </View>
          <View style={styles.cards}>
            <Text>3</Text>
          </View>
          <View style={styles.cards}>
            <Text>4</Text>
          </View>
          <View style={styles.cards}>
            <Text>5</Text>
          </View>
          <View style={styles.cards}>
            <Text>6</Text>
          </View> */}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardsContainer: {
    // flex:1,
    justifyContent: "space-between",
    gap: 20,
    marginTop: 20
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  role: {
    fontSize: 16,
    fontWeight: "400"
  },
  follow: {
    marginTop: 10,
    backgroundColor: "blue",
    elevation: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  cards: {
    width: "100%",
    borderWidth: 2,
    borderColor: "aqua",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 50,
    borderRadius: 8,
  }
})