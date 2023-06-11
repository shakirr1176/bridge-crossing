class CrossBridge{
    constructor(){
        this.isUnder = false
        this.speed = 0
        this.speedArr = []
        this.chacterCount = 0
        this.testing = 0
        this.targetSpeed = 0
        this.isUnder = false
        this.varDeclare()
        this.draw()
    }
    varDeclare(){
        this.playerPoster = document.querySelectorAll('.playerPoster')
        this.goBtn = document.querySelector('.go-btn')
        this.restartBtn = document.querySelector('.restart')
        this.lamp = document.querySelector('.lamp')
        this.countTime = document.querySelector('.count-time')
        this.passing = document.querySelector('.passing-msg')
    }
    draw(){
        for(let i=0; i<this.playerPoster.length; i++){
            this.playerIconClick(this.playerPoster[i])
        }
        this.letsGo()
        this.restartClick()
    }
    playerIconClick(item){
        let $this = this
        let playerItem = document.querySelector('.player'+item.id);
        item.addEventListener('click',function(){
            if($this.isUnder == false && document.querySelector('.winMsg').classList.contains('hidden')){
                $this.speed = item.children[1].children[0].innerHTML
            if($this.lamp.dataset['side'] == 'right'){
                if(playerItem.dataset['side'] == 'left' &&  $this.chacterCount<2){
                    playerItem.dataset['side'] = 'right'
                    item.children[1].style.background = 'red'
                    $this.chacterCount++
                    $this.speedArr.push($this.speed)
                }
                else if(playerItem.dataset['side'] == 'right'){
                    playerItem.dataset['side'] = 'left'
                    item.children[1].style.background = '#3f000070'
                    $this.chacterCount--
                    let l = $this.speedArr.indexOf(item.children[1].children[0].innerHTML) 
                    $this.speedArr.splice(l,1)
                }
            }else if($this.lamp.dataset['side'] == 'left'){
                if(playerItem.dataset['side'] == 'right' &&  $this.chacterCount<2){
                    playerItem.dataset['side'] = 'left'
                    item.children[1].style.background = 'red'
                    $this.chacterCount++
                    $this.speedArr.push($this.speed)
                }
                else if(playerItem.dataset['side'] == 'left'){
                    playerItem.dataset['side'] = 'right'
                    item.children[1].style.background = '#3f000070'
                    $this.chacterCount--
                    let l = $this.speedArr.indexOf(item.children[1].children[0].innerHTML) 
                    $this.speedArr.splice(l,1)
                }
            }
            }
        })
        
        this.goBtn.addEventListener('click',function(){
            if($this.speedArr.length != 0){
                $this.isUnder = true
            $this.goBtn.setAttribute('disabled','disabled')
            if($this.isUnder = true){
                $this.passing.innerHTML = '*crossing the bridge...'
                $this.passing.classList.add('updown')
            }
           
            setTimeout(()=>{
                $this.speedArr = []
            },(Math.max(...$this.speedArr)+2.5)*1000)
            $this.chacterCount = 0
            if($this.speedArr.length > 0){
                let cha1 = document.querySelector('.man'+$this.speedArr[0]);
                let cha2 = false;
                let targetSpeed = $this.speedArr[0];
                if($this.speedArr.length == 2){
                    targetSpeed = Math.max(...$this.speedArr)
                    cha1 = document.querySelector('.man'+Math.max(...$this.speedArr))
                    cha2 = document.querySelector('.man'+Math.min(...$this.speedArr))
                }
                
                if(playerItem.dataset['side'] == 'right' && item.children[1].style.background == 'red'){
                    cha1.style.transitionDuration = '1s'
                    $this.lamp.dataset['side'] = 'left'
                    cha1.style.left = '22%'
                    cha1.classList.remove('position1')
                    cha1.classList.add('position2')
                    if(cha2){
                        cha2.style.transitionDuration="1s"
                        cha2.style.left="19%"
                        cha2.classList.remove('position1')
                        cha2.classList.add('position2')
                    }

                    setTimeout(()=>{
                        cha1.style.transitionDuration = targetSpeed+'s'
                        $this.lamp.style.transitionDuration = targetSpeed+'s'
                        $this.lamp.dataset['side'] = 'left'
                        cha1.style.left = '63%'
                        $this.lamp.style.left = '67%'
                        $this.lamp.classList.add('lamp-position-2')
                        cha1.classList.remove('position1')
                        cha1.classList.add('position2')
                    if(cha2){
                        cha2.style.transitionDuration= targetSpeed+"s"
                        cha2.style.left="60%"
                        cha2.classList.remove('position1')
                        cha2.classList.add('position2')
                    }
                        setTimeout(()=>{
                                $this.lamp.classList.remove('lamp-position-2')
                                $this.lamp.classList.add('lamp-position-1')
                                cha1.style.transitionDuration = '1.5s'
                                $this.lamp.dataset['side'] = 'left'
                                cha1.style.left = 'calc('+(100-cha1.dataset['position2'])+'% - 80px)'
                                setTimeout(()=>{
                                    cha1.classList.remove('position2')
                                    cha1.classList.add('position3')
                                },1500)
                            if(cha2){
                                cha2.style.transitionDuration= "1.5s"
                                cha2.style.left = 'calc('+(100-cha2.dataset['position2'])+'% - 80px)'
                                setTimeout(()=>{
                                    cha2.classList.remove('position2')
                                    cha2.classList.add('position3')
                                },1500)
                            }
                        },targetSpeed*1000)
                    },1000)
                    item.children[1].style.background = '#3f000070'
                }
                else if(playerItem.dataset['side'] == 'left' && item.children[1].style.background == 'red'){
                    cha1.style.transitionDuration = '1.5s'
                    $this.lamp.dataset['side'] = 'right'
                    cha1.style.left = 'calc('+(100-25.5)+'% - 80px)'
                    cha1.classList.remove('position3')
                    cha1.classList.add('position4')
                    if(cha2){
                        cha2.style.transitionDuration="1.5s"
                        cha2.style.left= 'calc('+(100-22.5)+'% - 80px)'
                        cha2.classList.remove('position3')
                        cha2.classList.add('position4')
                    }

                    setTimeout(()=>{
                        $this.lamp.classList.add('lamp-position-2')
                        cha1.style.transitionDuration = targetSpeed+'s'
                        $this.lamp.style.transitionDuration = targetSpeed+'s'
                        $this.lamp.dataset['side'] = 'right'
                        cha1.style.left = '27%'
                        $this.lamp.style.left = '26%'
                        cha1.classList.remove('position3')
                        cha1.classList.add('position4')
                    if(cha2){
                        cha2.style.transitionDuration= targetSpeed+"s"
                        cha2.style.left="30%"
                        cha2.classList.remove('position3')
                        cha2.classList.add('position4')
                    }
                        setTimeout(()=>{
                                $this.lamp.classList.add('lamp-position-1')
                                $this.lamp.classList.remove('lamp-position-2')
                                cha1.style.transitionDuration = '1s'
                                $this.lamp.dataset['side'] = 'right'
                                cha1.style.left = cha1.dataset['position2'] +'%'
                                setTimeout(()=>{
                                    cha1.classList.remove('position4')
                                    cha1.classList.add('position1')
                                },1000)
                            if(cha2){
                                cha2.style.transitionDuration= "1s"
                                cha2.style.left = cha2.dataset['position2'] +'%'
                                setTimeout(()=>{
                                    cha2.classList.remove('position4')
                                    cha2.classList.add('position1')
                                },1000)
                            }
                        },targetSpeed*1000)
                    },1500)
                    item.children[1].style.background = '#3f000070'
                }
            }
            
           
            let lol = document.querySelectorAll('.playerPoster')
            let kl = document.querySelectorAll('.player')
            for(let i=0; i<lol.length; i++){
                if(kl[i].dataset['side'] == 'left' && $this.lamp.dataset['side'] == 'left'){
                    lol[i].style.opacity = '0.4'
                    lol[i].setAttribute('disabled','disabled')
                }
                else if(kl[i].dataset['side'] == 'right' && $this.lamp.dataset['side'] == 'right'){
                    lol[i].style.opacity = '0.4'
                    lol[i].setAttribute('disabled','disabled')
                }
                else{
                    lol[i].removeAttribute('disabled','disabled')
                    lol[i].style.opacity = '1'
                }
            }
            setTimeout(()=>{
                $this.isUnder = false
                if(document.querySelector('.winMsg').classList.contains('hidden')){
                    $this.passing.innerHTML = '*crossed bridge successfully!'
                    $this.passing.classList.remove('updown')
                    $this.goBtn.removeAttribute('disabled','disabled')
                }
            },(Math.max(...$this.speedArr)+2.5)*1000)
        }
    })
}

letsGo(){
    let $this = this
    this.goBtn.addEventListener('click',function(){
        if($this.speedArr.length != 0){
            $this.countTime.innerHTML = $this.countTime.innerHTML - Math.max(...$this.speedArr)
            if($this.countTime.innerHTML < 0){
                $this.countTime.innerHTML = 0
            }
        }
        $this.winningResult()
        })
    }

    winningResult(){
        let forWin = document.querySelector('.foot')
        let winChild = forWin.querySelectorAll('.player')
        let count = 0
        for(let i=0; i<winChild.length; i++){
            if(winChild[i].dataset['side'] == 'right'){
                count++
            }
        }
        console.log(count,this.countTime.innerHTML);
        if(count == 6 && this.countTime.innerHTML == 0){
            setTimeout(()=>{
                document.querySelector('.winMsg').innerHTML = 'Congratulation'
                document.querySelector('.winMsg').classList.remove('hidden')
                document.querySelector('.winMsg').classList.add('size')
                this.passing.innerHTML = 'Congratulation!'
                this.goBtn.setAttribute('disabled','disabled')
            },Math.max(...this.speedArr)*1000)
        }
        else if(count < 6 && this.countTime.innerHTML == 0){
                setTimeout(()=>{
                    document.querySelector('.winMsg').innerHTML = 'Time Out'
                    document.querySelector('.winMsg').classList.remove('hidden')
                    document.querySelector('.winMsg').classList.add('size')
                    this.passing.innerHTML = '*Game over'
                    this.goBtn.setAttribute('disabled','disabled')
                },Math.max(...this.speedArr)*1000)
        }
    }
    restartClick(){
        this.restartBtn.addEventListener('click',function(){
            window.location.replace(window.location.pathname + window.location.search + window.location.hash);
        })
    }
}
let crossBridge = new CrossBridge()

