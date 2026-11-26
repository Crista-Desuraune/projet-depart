const { seChevauchent } = require('../dist/regles')

test('ne détecte pas de chevauchement quand un créneau commence exactement quand l’autre finit', () => {
    // Préparer : créer les données nécessaires au test.
    const premier = {
        debut: new Date('2030-10-01T09:00:00Z'),
        fin: new Date('2030-10-01T10:00:00Z'),
    }

    // La seconde va de 10 h à 11 h : elle commence exactement quand la première finit.
    // La fin est exclue du créneau, donc les deux réservations n'ont aucune période commune.
    const second = {
        debut: new Date('2030-10-01T10:00:00Z'),
        fin: new Date('2030-10-01T11:00:00Z'),
    }

    // Agir : appeler la fonction avec ces données et récupérer sa réponse.
    const resultat = seChevauchent(premier, second)

    // Vérifier : comparer la réponse au résultat attendu.
    // expect désigne la valeur à vérifier et toBe(false) exige le booléen false.
    expect(resultat).toBe(false)
})