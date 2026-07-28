// Create a ProfileCard component.

// Requirements:

// name         -> string
// email        -> string
// isPremium    -> boolean
// onEdit       -> callback

// Expected usage:

// <ProfileCard
//     name="Vignesh"
//     email="vignesh@gmail.com"
//     isPremium={true}
//     onEdit={() => console.log("Edit Profile")}
// />

// Write:

// ProfileCardProps interface.
// ProfileCard component.
// The component usage.

import { Button, Text, View } from "react-native";

interface ProfileCardProps {
  name: string;
  email: string;
  isPremium: boolean;
  onEdit: () => void;
}

function ProfileCard({
  name,
  email,
  isPremium,
  onEdit,
}: ProfileCardProps) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{email}</Text>

      <Text>
        {isPremium ? "⭐ Premium" : "Free"}
      </Text>

      <Button
        title="Edit"
        onPress={onEdit}
      />
    </View>
  );
}

<ProfileCard
name="Viz"
email="viz@gmail.com"
isPremium={true}
onEdit={()=>console.log("Edit Profile")}
/>