<!DOCTYPE html>
<html>
	<head>
		<title>Tripeaks</title>
        <meta charset="utf-8" />
		<link rel="stylesheet" href="screen.css" />
	</head>
	<body>
		<div id="wrapper">
			<div id="field"></div>
			<div id="hole" class="back"></div>
			<div id="card"></div>
			<div id="hand"></div>
			<div id="stats" class="stats">Score: <span class="statVal" id="score">0</span> Cards Left: <span class="statVal" id="cardsLeft">0</span></div>
			<button id="newHand">New Hand</button>
            <div id="info" class="stats">
                <p>This Run: <span class="statVal" id="currentRun">0</span> pts</p>
                <p>Best Run: <span class="statVal" id="bestRun">0</span> pts</p>
            </div>
		</div>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script src="game.js"></script>
	</body>
</html>