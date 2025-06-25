# LLM Prompt Templetes

### Home Page carousel image generator -

I have a website called ColorMyPage.com, free downloadable coloring pages. I am trying to create a landscape orientation image. The image should be cartoonish and be colored as crayon or chalk. Please do not include text. The following topic: 

Ex. Unicorns dancing around a rainbow fire

## 1. Create Cateogry

### For generating a cover image for coloring page categories -

I have a website called ColorMyPage.com, free downloadable coloring pages. I am trying to create portrait orientation image. The image should be cartoonish and be colored as crayon or chalk. Please do not include text. The following topic: 

Ex. Unicorns dancing around a rainbow fire

### Templete for generating a blog for coloring page categories -

<h1>Free Unicorn Coloring Pages for Kids and Families</h1>
<br>
<p>Looking for magical and creative activities for your little ones? Explore our enchanting collection of <strong>free printable unicorn coloring pages</strong> that spark imagination and bring fantasy to life! Perfect for <em>homeschool projects</em>, <em>classroom fun</em>, birthday parties, or relaxing afternoons at home.</p>
<br>

<h2>Why Kids Love Our Unicorn Coloring Pages</h2>
<br>
<p>Our <strong>unicorn coloring sheets</strong> are filled with whimsical designs, from flying unicorns to dreamy rainbows and stars. These printables are perfect for inspiring creativity while helping kids build fine motor skills and color recognition.</p>
<br>

<h2>What’s Inside This Magical Collection?</h2>
<br>
<ul>
  <li>Unicorns prancing through magical forests</li>
  <li>Flying unicorns with rainbow wings and sparkles</li>
  <li>Sleepy unicorns nestled in clouds and moonlight</li>
  <li>Fairy-tale castles, stars, hearts, and rainbows</li>
  <li>And many more cute and magical unicorn friends!</li>
</ul>
<br>

<h2>Download Your Free Unicorn Coloring Pages</h2>
<br>
<p>Choose your favorites and print as many as you like! We’re always adding new unicorn designs, so be sure to bookmark this page and come back for more magical fun.</p>
<br>

<h2>Show Off Your Colorful Creations</h2>
<br>
<p>We’d love to see your sparkly unicorn artwork! Share your finished coloring pages on social media with the hashtag <strong>#ColorMyPage</strong> and tag your friends to join the fun.</p>
<br>

<p>Let the magic begin—<strong>download your free unicorn coloring pages now</strong> and bring your fantasy world to life!</p>


Using the above example templete can you make a blog post for ColorMyPage.com, free downloadable coloring pages.

## 2. Coloring Pages

### For generating page ideas from chatgpt -

I am creating ideas for a coloring book. Can you give me 50 unique and creative ideas on the following topic, and return the response in the form of a json array of objects with title and description fields?

Ex. Unicorn coloring pages

Steps -
Cateogry
    1 - Decide of the category
    2 - Create the category cover image
    3 - Create the category blog post
    4 - Create the cateogry row
Coloring pages
    1 - Generate coloring pages based on the category
    2 - Frame the coloring pages
    3 - Upload to supabase
    4 - Upload the coloring_pages.csv to the coloring pages table
    5 - Fill out the coloring_pages_categories.csv and upload to the table