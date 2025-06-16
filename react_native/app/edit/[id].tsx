import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function EditNote() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/notes/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Gagal memuat catatan.");
      });
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !content) {
      Alert.alert("Judul dan isi tidak boleh kosong.");
      return;
    }

    try {
      await axios.put(`${BASE_URL}/notes/${id}`, { title, content });
      Alert.alert("Berhasil", "Catatan berhasil diperbarui.", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert("Gagal", "Terjadi kesalahan saat memperbarui catatan.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Catatan</Text>

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
        style={[styles.input, styles.textArea]}
        placeholder="Masukkan isi catatan"
        placeholderTextColor="#999"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
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
  textArea: {
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

