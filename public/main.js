const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=voto]:checked').id;
    const data = { voto: choice };

    fetch('https://votacao.onrender.com/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));


    e.preventDefault();
})

fetch('https://votacao.onrender.com/poll')
.then(res => res.json())
.then(data => {
    const votes = data.votos;
    const totalVotes = data.lenght;

    let voteCounts = {
        Sim: 0,
        Claro: 0,
        Obvio: 0,
    };

    voteCounts = votes.reduce((acc, vote) => (
        (acc[vote.voto] = (acc[vote.voto] || 0) + parseInt(vote.pontos)), acc),
        {}
    );

    let dataPoints = [
        { label: 'Sim', y: voteCounts.Sim},
        { label: 'Claro', y:voteCounts.Claro},
        { label: 'Obvio', y:voteCounts.Obvio}
    ];
    
    const chartContainer = document.querySelector('#chartContainer');
    
    if(chartContainer) {
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: 'Resultados'
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints
                }
            ]
        });
        chart.render();
    
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('126aaf37d840aabb0828', {
          cluster: 'sa1'
        });
    
        var channel = pusher.subscribe('votos');
        channel.bind('votar', function(data) {
          dataPoints = dataPoints.map(x => {
            if(x.label == data.voto) {
                x.y += data.pontos;
                return x;
            } else {
                return x;
            }
          })
          chart.render();
        });
    }
})