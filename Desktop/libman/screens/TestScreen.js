import React from 'react';
import { View, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function TestScreen() {
  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase.from('members').select('*');
      
      if (error) {
        console.error('Error fixing members:', error.message);
        return;
      }
      
      console.log('Members data:', data);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Library Management App</Text>
      <Button title="Test Supabase Connection" onPress={fetchMembers} />
    </View>
  );
}
