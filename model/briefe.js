var mongoose = require('mongoose');   
var briefeSchema = new mongoose.Schema({   
	titel: String,
	vorlage: Boolean,
	staticcontent: { korrespodent: {  institut: String,
                                    addresse: String,
                                    chefaerzte: String,
                                    telefon: String
                                    },
                     patient: { nachname: String,
                                vorname: String,
                                krankenkasse: String,
                                hausarzt: String
                                },
                     diagnose: {  diagnose: String,
                                  datum: String
                                  },
                     adressat: { name: String,
                                 addresse: String
                                }
                   },
	varcontent: [{titel: String, content: String}]
}); 
mongoose.model('Briefe', briefeSchema);