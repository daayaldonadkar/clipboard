import React from 'react';
import { View, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function TestScreen() {
  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase.from('members').select('*');
      
      if (error) {
        console.error('Error fetching members:', error.message);
        return;
      }
      
      console.log('Members data:', data);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const addMember = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .insert([{ name: 'New Member', email: `new_${Date.now()}@example.com` }])
        .select();

      if (error) {
        console.error('Error adding member:', error.message);
        return;
      }

      console.log('Member added successfully:', data);
      await fetchMembers(); // Refresh the list in console
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Library Management App</Text>
      <Button title="Test Supabase Connection (Fetch)" onPress={fetchMembers} />
      <View style={{ height: 10 }} />
      <Button title="Add Test Member (Save)" onPress={addMember} />
    </View>
  );
}
