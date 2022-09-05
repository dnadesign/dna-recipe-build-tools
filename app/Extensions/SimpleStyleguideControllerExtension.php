<?php

namespace App\Extensions;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\FormAction;
use SilverStripe\View\ArrayData;

class SimpleStyleguideControllerExtension extends Extension
{
    public function onBeforeInit()
    {
        \PageController::create()->loadBuiltReqs();
    }

    public function updateForm($form)
    {
        $form->addExtraClass('form');
        $uploadField = UploadField::create('FileUpload', 'File upload');
        $uploadField->setForm($form);
        $form->Fields()->push($uploadField);
        $form->Actions()->fieldByName('action_doForm')->setUseButtonTag(true)->addExtraClass('button button--primary');
        $form->Actions()->push(FormAction::create('Secondary', 'Secondary')->setUseButtonTag(true)->addExtraClass('button button--secondary'));
    }

    public function updateStyleguideData(ArrayData $data)
    {
        $data->PageTheme = 'theme--light';
    }
}
