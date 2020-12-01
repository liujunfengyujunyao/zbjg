<?php

namespace app\admin\controller\supplier;

use app\common\controller\Backend;
use think\Db;

/**
 * 供应商管理
 *
 * @icon fa fa-circle-o
 */
class Supplier extends Backend
{
    protected $noNeedRight = ['select_list'];
    /**
     * Supplier模型对象
     * @var \app\admin\model\supplier\Supplier
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\supplier\Supplier;
        $this->view->assign("statusList", $this->model->getStatusList());
    }
    
    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    public function select_list()
    {

        $list = DB::name('supplier')->field('id,supplier_name as name')->where(['status'=>1])->select();

        return json(['list'=>$list,'total'=>count($list)]);
    }

}
