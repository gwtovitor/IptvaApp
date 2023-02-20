import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const MyButton = ({ props, onPress, text, imageSource, hasTVPreferredFocus }) => {
  return (
    <TouchableOpacity
      onFocus={props}
      onBlur={props}
      style={[styles.button, hasTVPreferredFocus && styles.focusedButton]}
      onPress={onPress}
      hasTVPreferredFocus={hasTVPreferredFocus}
    >
      {imageSource && (
        <Image
          source={imageSource}
          style={{ width: 150, height: 200, marginRight: 10 }}
        />
      )}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  focusedButton: {
    backgroundColor: '#f00',
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyButton;
