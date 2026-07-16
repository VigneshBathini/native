//inddividual file for useMutation

import {View,Text,Button} from 'react-native'
import {useMutation,useQueryClient} from '@tanstack/react-query'
import {createPost} from './api'

export default function UseMutation() {

    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {  
            console.log('Post created successfully');

            // Invalidate and refetch /refresh post query
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    return (
        <View>
            <Button
                title="Create Post"
                onPress={() => {
                    mutation.mutate({
                        title: 'React Query',
                        body: 'Learning',
                        userId: 1
                    });
                }}
            />
            </View>
    )
}


