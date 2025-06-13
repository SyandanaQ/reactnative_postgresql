import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function NewNoteScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert("Judul dan isi catatan harus diisi.");
      return;
    }

    try {
      await axios.post("http://192.168.0.190:3001/notes", {
        title,
        content,
      });

      Alert.alert("Berhasil", "Catatan berhasil disimpan.", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan catatan.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tambah Catatan</Text>

      <Text style={styles.label}>Judul</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan judul"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Isi</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Masukkan isi catatan"
        placeholderTextColor="#999"
        multiline
        value={content}
        onChangeText={setContent}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "#000",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
