import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  PermissionsAndroid,
} from "react-native";
import EscPosPrinter, {
  getPrinterSeriesByName,
} from "react-native-esc-pos-printer";

const BluetoothPrinter = () => {
  const pharmacy = "Pharmaways";
  const adddress = "Customs Quarters, El-king, Ibereko, Lagos";
  const phone1 = "09151554266";
  const phone2 = "09016608891";
  const [drug, setDrug] = useState("");
  const [prescription, setPrescription] = useState("");
  const printText = async () => {
    try {
      const printers = await EscPosPrinter.discover();

      const printer = printers[0];

      await EscPosPrinter.init({
        target: printer.target,
        seriesName: getPrinterSeriesByName(printer.name),
        language: "EPOS2_LANG_EN",
      });

      const requestPrinterPermissions = async () => {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        if (
          granted["android.permission.BLUETOOTH_SCAN"] === "granted" &&
          granted["android.permission.BLUETOOTH_CONNECT"] === "granted"
        ) {
          console.log("BLUETOOTH permissions granted");
        } else {
          console.log("BLUETOOTH permissions denied");
        }
      };
      await requestPrinterPermissions();
      const printing = new EscPosPrinter.printing();
      PermissionsAndroid.requestMultiple([]);
      await printing
        .initialize()
        .align("center")
        .size(2, 2)
        .line(pharmacy)
        .size(1, 1)
        .line(adddress)
        .line(phone1 + "," + phone2)
        .line(drug)
        .line(prescription)
        .line("Here's to your health and well-being. Take care!")
        .cut()
        .send();
    } catch (error) {
      console.error("Error printing:", error);
    }
  };

  return (
    <View>
      <Text>Pharmaways Prescription Printer</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Drug Name"
        value={drug}
        onChangeText={setDrug}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Dosage instructions"
        value={prescription}
        onChangeText={setPrescription}
      />
      <Button title="Print" onPress={printText} />
    </View>
  );
};

export default BluetoothPrinter;
