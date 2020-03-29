import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    logincontainer: {
        backgroundColor: "#fff",
        padding: 10,
        margin: 30,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderRadius: 8,
    },

    titlelogin: {
        fontWeight: "bold",
        fontSize: 20,
        margin: 10,
    },

    button: {
        width: "100%",
        maxWidth: 100,
        backgroundColor: "#0074D9",
        borderRadius: 2,
        padding: 10,
        margin: 20,
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center",
    },

    divinputs: {
        margin: 20,
    },

    setvalues: {
        borderColor: "#rgba(0, 0, 0, 0.1)",
        padding: 10,
        borderWidth: 1,
        marginTop: 20,
    },

    alertDontHaveAccount: {
        marginLeft: 20,
        marginBottom: 20,
    },

    DontHaveAccountTitle: {
        fontWeight: "bold",
    },

    DontHaveAccountValue: {
        color: "#555",
    },
})