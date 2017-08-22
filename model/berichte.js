var mongoose = require('mongoose');   
var berichteSchema = new mongoose.Schema({   
	titel: String,
	vorlage: Boolean,
	staticcontent: { korrespodent: { institut: String,
                                     addresse: String,
                                     chefaerzte: String,
                                     telefon: String
                                    },
                     patient: { nachname: String,
                                vorname: String,
                                krankenkasse: String,
                                hausarzt: String
                                },
                     operation: { opstext: String,
                                  diagnose: String,
                                  datum: String,
                                  dauer: String
                                  },
                     personal: { operateur: String,
                                 anaesthesie: String,
                                 instrum: String,
                                 springer: String
                                }
                   },
	varcontent: [{titel: String, content: String}]
}); 
mongoose.model('Berichte', berichteSchema);