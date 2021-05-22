Setup guid
0. drop all assets into public folder, example http://yourserver.com/assets/

1. add scripts to your head file
 <head>
    <script src="/dependencies/pep.min.js"></script> 
    <link rel="stylesheet" href="src="/dependencies/bootstrap.min.css">
    <script src="/app.055df2d5414d399d68ca.js"></script>
 </head>    

2. specify in your html file where scene should run, add for example <div id="warrior-scene">, id=required
2.1 specify container width end height via css   
.warrior-container {
      width: 100vw;
      height: 100vh;
      max-width: 500px;
      max-height: 300px;
 }

3. after all scripts are loaded run <br>
`<script> 
window.InitWarrior("warrior-scene", {
     modelRoot: "/assets/",
     onOrder: function onOrder(data) => console.log(data.selected)
});
</script>`
