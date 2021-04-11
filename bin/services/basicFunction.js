const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

exports.capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.generateName = () => {
    const capFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
	let names = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished","accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent","adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated","agonizing","agreeable","ajar","alarmed","alarming","alert","alienated","alive","all","altruistic","amazing","ambitious","ample","amused","amusing","anchored","ancient","angelic","angry","anguished","animated","annual","another","antique","anxious","any","apprehensive","appropriate","apt","arctic","arid","aromatic","artistic","ashamed","assured","astonishing","athletic","attached","attentive","attractive","austere","authentic","authorized","automatic","avaricious","average","aware","awesome","awful","awkward","babyish","bad","back","baggy","bare","barren","basic","beautiful","belated","beloved","beneficial","better","best","bewitched","big","big-hearted","biodegradable","bite-sized","bitter","black","black-and-white","bland","blank","blaring","bleak","blind","blissful","blond","blue","blushing","bogus","boiling","bold","bony","boring","bossy","both","bouncy","bountiful","bowed","brave","breakable","brief","bright","brilliant","brisk","broken","bronze","brown","bruised","bubbly","bulky","bumpy","buoyant","burdensome","burly","bustling","busy","buttery","buzzing","calculating","calm","candid","canine","capital","carefree","careful","careless","caring","cautious","cavernous","celebrated","charming","cheap","cheerful","cheery","chief","chilly","chubby","circular","classic","clean","clear","clear-cut","clever","close","closed","cloudy","clueless","clumsy","cluttered","coarse","cold","colorful","colorless","colossal","comfortable","common","compassionate","competent","complete","complex","complicated","composed","concerned","concrete","confused","conscious","considerate","constant","content","conventional","cooked","cool","cooperative","coordinated","corny","corrupt","costly","courageous","courteous","crafty","crazy","creamy","creative","creepy","criminal","crisp","critical","crooked","crowded","cruel","crushing","cuddly","cultivated","cultured","cumbersome","curly","curvy","cute","cylindrical","damaged","damp","dangerous","dapper","daring","darling","dark","dazzling","dead","deadly","deafening","dear","dearest","decent","decimal","decisive","deep","defenseless","defensive","defiant","deficient","definite","definitive","delayed","delectable","delicious","delightful","delirious","demanding","dense","dental","dependable","dependent","descriptive","deserted","detailed","determined","devoted","different","difficult","digital","diligent","dim","dimpled","dimwitted","direct","disastrous","discrete","disfigured","disgusting","disloyal","dismal","distant","downright","dreary","dirty","disguised","dishonest","dismal","distant","distinct","distorted","dizzy","dopey","doting","double","downright","drab","drafty","dramatic","dreary","droopy","dry","dual","dull","dutiful","each","eager","earnest","early","easy","easy-going","ecstatic","edible","educated","elaborate","elastic","elated","elderly","electric","elegant","elementary","elliptical","embarrassed","embellished","eminent","emotional","empty","enchanted","enchanting","energetic","enlightened","enormous","enraged","entire","envious","equal","equatorial","essential","esteemed","ethical","euphoric","even","evergreen","everlasting","every","evil","exalted","excellent","exemplary","exhausted","excitable","excited","exciting","exotic","expensive","experienced","expert","extraneous","extroverted","extra-large","extra-small","fabulous","failing","faint","fair","faithful","fake","false","familiar","famous","fancy","fantastic","far","faraway","far-flung","far-off","fast","fat","fatal","fatherly","favorable","favorite","fearful","fearless","feisty","feline","female","feminine","few","fickle","filthy","fine","finished","firm","first","firsthand","fitting","fixed","flaky","flamboyant","flashy","flat","flawed","flawless","flickering","flimsy","flippant","flowery","fluffy","fluid","flustered","focused","fond","foolhardy","foolish","forceful","forked","formal","forsaken","forthright","fortunate","fragrant","frail","frank","frayed","free","French","fresh","frequent","friendly","frightened","frightening","frigid","frilly","frizzy","frivolous","front","frosty","frozen","frugal","fruitful","full","fumbling","functional","funny","fussy","fuzzy","gargantuan","gaseous","general","generous","gentle","genuine","giant","giddy","gigantic","gifted","giving","glamorous","glaring","glass","gleaming","gleeful","glistening","glittering","gloomy","glorious","glossy","glum","golden","good","good-natured","gorgeous","graceful","gracious","grand","grandiose","granular","grateful","grave","gray","great","greedy","green","gregarious","grim","grimy","gripping","grizzled","gross","grotesque","grouchy","grounded","growing","growling","grown","grubby","gruesome","grumpy","guilty","gullible","gummy","hairy","half","handmade","handsome","handy","happy","happy-go-lucky","hard","hard-to-find","harmful","harmless","harmonious","harsh","hasty","hateful","haunting","healthy","heartfelt","hearty","heavenly","heavy","hefty","helpful","helpless","hidden","hideous","high","high-level","hilarious","hoarse","hollow","homely","honest","honorable","honored","hopeful","horrible","hospitable","hot","huge","humble","humiliating","humming","humongous","hungry","hurtful","husky","icky","icy","ideal","idealistic","identical","idle","idiotic","idolized","ignorant","ill","illegal","ill-fated","ill-informed","illiterate","illustrious","imaginary","imaginative","immaculate","immaterial","immediate","immense","impassioned","impeccable","impartial","imperfect","imperturbable","impish","impolite","important","impossible","impractical","impressionable","impressive","improbable","impure","inborn","incomparable","incompatible","incomplete","inconsequential","incredible","indelible","inexperienced","indolent","infamous","infantile","infatuated","inferior","infinite","informal","innocent","insecure","insidious","insignificant","insistent","instructive","insubstantial","intelligent","intent","intentional","interesting","internal","international","intrepid","ironclad","irresponsible","irritating","itchy","jaded","jagged","jam-packed","jaunty","jealous","jittery","joint","jolly","jovial","joyful","joyous","jubilant","judicious","juicy","jumbo","junior","jumpy","juvenile","kaleidoscopic","keen","key","kind","kindhearted","kindly","klutzy","knobby","knotty","knowledgeable","knowing","known","kooky","kosher","lame","lanky","large","last","lasting","late","lavish","lawful","lazy","leading","lean","leafy","left","legal","legitimate","light","lighthearted","likable","likely","limited","limp","limping","linear","lined","liquid","little","live","lively","livid","loathsome","lone","lonely","long","long-term","loose","lopsided","lost","loud","lovable","lovely","loving","low","loyal","lucky","lumbering","luminous","lumpy","lustrous","luxurious","mad","made-up","magnificent","majestic","major","male","mammoth","married","marvelous","masculine","massive","mature","meager","mealy","mean","measly","meaty","medical","mediocre","medium","meek","mellow","melodic","memorable","menacing","merry","messy","metallic","mild","milky","mindless","miniature","minor","minty","miserable","miserly","misguided","misty","mixed","modern","modest","moist","monstrous","monthly","monumental","moral","mortified","motherly","motionless","mountainous","muddy","muffled","multicolored","mundane","murky","mushy","musty","muted","mysterious","naive","narrow","nasty","natural","naughty","nautical","near","neat","necessary","needy","negative","neglected","negligible","neighboring","nervous","new","next","nice","nifty","nimble","nippy","nocturnal","noisy","nonstop","normal","notable","noted","noteworthy","novel","noxious","numb","nutritious","nutty","obedient","obese","oblong","oily","oblong","obvious","occasional","odd","oddball","offbeat","offensive","official","old","old-fashioned","only","open","optimal","optimistic","opulent","orange","orderly","organic","ornate","ornery","ordinary","original","other","our","outlying","outgoing","outlandish","outrageous","outstanding","oval","overcooked","overdue","overjoyed","overlooked","palatable","pale","paltry","parallel","parched","partial","passionate","past","pastel","peaceful","peppery","perfect","perfumed","periodic","perky","personal","pertinent","pesky","pessimistic","petty","phony","physical","piercing","pink","pitiful","plain","plaintive","plastic","playful","pleasant","pleased","pleasing","plump","plush","polished","polite","political","pointed","pointless","poised","poor","popular","portly","posh","positive","possible","potable","powerful","powerless","practical","precious","present","prestigious","pretty","precious","previous","pricey","prickly","primary","prime","pristine","private","prize","probable","productive","profitable","profuse","proper","proud","prudent","punctual","pungent","puny","pure","purple","pushy","putrid","puzzled","puzzling","quaint","qualified","quarrelsome","quarterly","queasy","querulous","questionable","quick","quick-witted","quiet","quintessential","quirky","quixotic","quizzical","radiant","ragged","rapid","rare","rash","raw","recent","reckless","rectangular","ready","real","realistic","reasonable","red","reflecting","regal","regular","reliable","relieved","remarkable","remorseful","remote","repentant","required","respectful","responsible","repulsive","revolving","rewarding","rich","rigid","right","ringed","ripe","roasted","robust","rosy","rotating","rotten","rough","round","rowdy","royal","rubbery","rundown","ruddy","rude","runny","rural","rusty","sad","safe","salty","same","sandy","sane","sarcastic","sardonic","satisfied","scaly","scarce","scared","scary","scented","scholarly","scientific","scornful","scratchy","scrawny","second","secondary","second-hand","secret","self-assured","self-reliant","selfish","sentimental","separate","serene","serious","serpentine","several","severe","shabby","shadowy","shady","shallow","shameful","shameless","sharp","shimmering","shiny","shocked","shocking","shoddy","short","short-term","showy","shrill","shy","sick","silent","silky","silly","silver","similar","simple","simplistic","sinful","single","sizzling","skeletal","skinny","sleepy","slight","slim","slimy","slippery","slow","slushy","small","smart","smoggy","smooth","smug","snappy","snarling","sneaky","sniveling","snoopy","sociable","soft","soggy","solid","somber","some","spherical","sophisticated","sore","sorrowful","soulful","soupy","sour","Spanish","sparkling","sparse","specific","spectacular","speedy","spicy","spiffy","spirited","spiteful","splendid","spotless","spotted","spry","square","squeaky","squiggly","stable","staid","stained","stale","standard","starchy","stark","starry","steep","sticky","stiff","stimulating","stingy","stormy","straight","strange","steel","strict","strident","striking","striped","strong","studious","stunning","stupendous","stupid","sturdy","stylish","subdued","submissive","substantial","subtle","suburban","sudden","sugary","sunny","super","superb","superficial","superior","supportive","sure-footed","surprised","suspicious","svelte","sweaty","sweet","sweltering","swift","sympathetic","tall","talkative","tame","tan","tangible","tart","tasty","tattered","taut","tedious","teeming","tempting","tender","tense","tepid","terrible","terrific","testy","thankful","that","these","thick","thin","third","thirsty","this","thorough","thorny","those","thoughtful","threadbare","thrifty","thunderous","tidy","tight","timely","tinted","tiny","tired","torn","total","tough","traumatic","treasured","tremendous","tragic","trained","tremendous","triangular","tricky","trifling","trim","trivial","troubled","true","trusting","trustworthy","trusty","truthful","tubby","turbulent","twin","ugly","ultimate","unacceptable","unaware","uncomfortable","uncommon","unconscious","understated","unequaled","uneven","unfinished","unfit","unfolded","unfortunate","unhappy","unhealthy","uniform","unimportant","unique","united","unkempt","unknown","unlawful","unlined","unlucky","unnatural","unpleasant","unrealistic","unripe","unruly","unselfish","unsightly","unsteady","unsung","untidy","untimely","untried","untrue","unused","unusual","unwelcome","unwieldy","unwilling","unwitting","unwritten","upbeat","upright","upset","urban","usable","used","useful","useless","utilized","utter","vacant","vague","vain","valid","valuable","vapid","variable","vast","velvety","venerated","vengeful","verifiable","vibrant","vicious","victorious","vigilant","vigorous","villainous","violet","violent","virtual","virtuous","visible","vital","vivacious","vivid","voluminous","wan","warlike","warm","warmhearted","warped","wary","wasteful","watchful","waterlogged","watery","wavy","wealthy","weak","weary","webbed","wee","weekly","weepy","weighty","weird","welcome","well-documented","well-groomed","well-informed","well-lit","well-made","well-off","well-to-do","well-worn","wet","which","whimsical","whirlwind","whispered","white","whole","whopping","wicked","wide","wide-eyed","wiggly","wild","willing","wilted","winding","windy","winged","wiry","wise","witty","wobbly","woeful","wonderful","wooden","woozy","wordy","worldly","worn","worried","worrisome","worse","worst","worthless","worthwhile","worthy","wrathful","wretched","writhing","wrong","wry","yawning","yearly","yellow","yellowish","young","youthful","yummy","zany","zealous","zesty","zigzag","rocky"];
	let name = capFirst(names[getRandomInt(0, names.length + 1)]);
	return name;

}

exports.generateNumber = (length) => {
    const numbers ='0123456789';
    let result = ' ';
    const numbersLength = numbers.length;
    for ( let i = 0; i < length; i++ ) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return parseInt(result);
}

exports.dateFormat = (now) => {
    let year = now.getFullYear()
    let month = this.padStart((now.getMonth() + 1), 2, "0")
    let date = this.padStart(now.getDate(), 2, "0")
    let hours = this.padStart(now.getHours(), 2, "0")
    let minutes = this.padStart(now.getMinutes(), 2, "0")
    let seconds = this.padStart(now.getSeconds(), 2, "0")
    return `${year}${month}${date}${hours}${minutes}${seconds}`
}

exports.padStart = (str, num, data) => {
    return str.toString().padStart(num, data)
}

exports.generateString = (length) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


exports.buildMessage = (object) => {
    let body = {}
    for (const key in object) {
        body[key] = this.dataGenerator(key, object[key])
    }
    return body
}

exports.dataGenerator = (key, value) => {
    let now = new Date()

    if(/id/i.test(key)) {
        if(value.default) {
            return value.default
        }
        if(value.type === 'string') {
            return uuidv4()
        }
        if(value.type === 'number') {
            return this.generateNumber(10)
        }
    }

    if(/name/i.test(key)) {
        if(value.default) {
            return value.default
        }
        if(value.type === 'string') {
            return this.generateName()
        }
        if(value.type === 'number') {
            return this.generateNumber(10)
        }
    }

    if(/age/i.test(key)) {
        if(value.default) {
            return value.default
        }
        if(value.type === 'string') {
            return this.generateNumber(2).toString()
        }
        if(value.type === 'number') {
            return this.generateNumber(2)
        }
    }

    if('password' === key) {
        if(value.default) {
            return value.default
        }
        if(value.type === 'string') {
            return this.generateString(10)
        }
        if(value.type === 'number') {
            return this.generateNumber(10)
        }
    }

    if(value.default) {
       return value.default
    }

    if(value.enum) {
        return value.enum[getRandomInt(0, value.enum.length)]
    }

    if(value.format) {
        if(value.format === 'date-time') {
            return now.toISOString()
        }
        if(value.format === 'date') {
            return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
        }
        if(value.format === 'time') {
            return `${now.getHours()}:${now.getMinutes()+1}:${now.getSeconds()}`
        }
        if(value.format === 'email') {
            return `${this.generateName()}@gmail.com`
        }
        if(value.format === 'uuid') {
            return uuidv4()
        }
    }

    if(value.type == 'string') {
        return this.generateName()
    }

    if(value.type == 'number') {
        return this.generateNumber(5)
    }

    if(value.type == 'boolean') {
        let boolData = [false, true]
        return boolData[getRandomInt(0, boolData.length)]
    }

    if(value.type == 'array') {
        return []
    }

}

exports.generatePostmanFile = ({ env, inputPath, fileNames }) => {

    let items = []

    try {
        let initialCustomPath = path.join(inputPath, 'initialCustom')
        let isDirectory = fs.lstatSync(initialCustomPath).isDirectory()
        if(isDirectory) {
            for (const fileName of fs.readdirSync(initialCustomPath)) {
                let initData = fs.readFileSync(path.join(initialCustomPath, fileName),{ encoding:'utf8' });

                try {
                    initData = JSON.parse(initData)
                    items.push(initData)
                } catch (error) {
                    console.log('Please check file in the init-custom.')
                    return '{}'
                }
            }
        }
    } catch (error) { }

    for (const fileName of fileNames) {
        try {
            let isDirectory = fs.lstatSync(path.join(inputPath, fileName)).isDirectory()
            if(!isDirectory) {
                let cmdData = fs.readFileSync(path.join(inputPath, fileName),{ encoding:'utf8' });
                cmdData = JSON.parse(cmdData)
                let body = JSON.stringify(this.buildMessage(cmdData),undefined, 2);
                let name = fileName.replace('.json','')
                let idName = camelToSnakeCase(name)
                let cmdPath = idName.replace(/\_/g, '-')
                let templateName = idName.replace(/\_/g, ' ')
                let postmanItem = {
                    name: templateName,
                    item: []
                }
                let configPostmanFile = ['item-get-by-id.json','item-get.json','item-post.json', 'item-patch.json', 'item-put.json', 'item-delete.json']

                for (const postmanFileName of configPostmanFile) {
                    let templatePostmanData = fs.readFileSync(path.join(__dirname, '../..', 'config/postman', postmanFileName), { encoding:'utf8' });
                    let newPostmanData = templatePostmanData
                        .replace(/\$\{templateName\}/g, templateName)
                        .replace(/\$\{baseURL\}/g, env.baseURL)
                        .replace(/\$\{path\}/g, cmdPath)
                        .replace(/\$\{idName\}/g, env.idForEvent.replace(/\$\(cmd\)/g, idName));

                    newPostmanData = JSON.parse(newPostmanData)
                    if(newPostmanData.request.header) {
                        newPostmanData.request.header = [...newPostmanData.request.header, ...env.headers]
                    }

                    newPostmanData.request.auth = env.auth
                    let method = newPostmanData.request.method
                    if(method === 'POST' || method === 'PATCH' || method === 'PUT') {
                        newPostmanData.request.body.raw = body
                    }
                    postmanItem.item.push(newPostmanData)
                }
                items.push(postmanItem)
            }

        } catch(e) {
            console.log(e)
            console.log('Please check JSON format.')
            break;
        }
    }
    
    let postmanSchema = {
        "info": {
            "name": env.projectName,
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        "item": items
    }
    return JSON.stringify(postmanSchema, undefined, 2);
}